package fr.perso.ps6_final.service;

import android.app.IntentService;
import android.content.Intent;
import android.util.Log;

import org.eclipse.paho.android.service.MqttAndroidClient;
import org.eclipse.paho.client.mqttv3.IMqttActionListener;
import org.eclipse.paho.client.mqttv3.IMqttDeliveryToken;
import org.eclipse.paho.client.mqttv3.IMqttToken;
import org.eclipse.paho.client.mqttv3.MqttCallback;
import org.eclipse.paho.client.mqttv3.MqttException;
import org.eclipse.paho.client.mqttv3.MqttMessage;

import java.nio.charset.StandardCharsets;

import fr.perso.ps6_final.App;
import fr.perso.ps6_final.listener.AuthListener;
import fr.perso.ps6_final.listener.MainListener;

public class MqttService extends IntentService {

    private AuthListener authListener;
    private MainListener mainListener;

    private MqttAndroidClient client;

    public MqttService() {
        super("MqttService");
    }

    @Override
    protected void onHandleIntent(Intent intent) {
        try {
            ((App) getApplication()).setMqttService(this);

            client = new MqttAndroidClient(this, "tcp://127.0.0.1:1883", "android");
            ((App) getApplication()).setMqttClient(client);

            IMqttToken token = client.connect();
            token.setActionCallback(new IMqttActionListener() {
                @Override
                public void onSuccess(IMqttToken asyncActionToken) {
                    subscribe(client, "stringIn1");
                    subscribe(client, "stringIn2");
                    subscribe(client, "connected");
                }

                @Override
                public void onFailure(IMqttToken asyncActionToken, Throwable exception) {
                }
            });

            client.setCallback(new MqttCallback() {
                @Override
                public void connectionLost(Throwable cause) {
                }

                @Override
                public void messageArrived(String topic, MqttMessage message) {
                    String response = new String(message.getPayload());
                    if (topic.equals("stringIn1")) {
                        mainListener.stringIn1(response);
                    } else if (topic.equals("stringIn2")) {
                        mainListener.stringIn2(response);
                    } else if (topic.equals("connected")) {
                        authListener.onConnected(response);
                    }
                }

                @Override
                public void deliveryComplete(IMqttDeliveryToken token) {
                }
            });
        } catch (MqttException e) {
            e.printStackTrace();
        }

    }

    public void publish(MqttAndroidClient client, String topic, String payload) {
        try {
            byte[] encodedPayload = payload.getBytes(StandardCharsets.UTF_8);
            MqttMessage message = new MqttMessage(encodedPayload);
            client.publish(topic, message);
        } catch (MqttException e) {
            e.printStackTrace();
        }
    }

    private void subscribe(MqttAndroidClient client, String topic) {
        int qos = 0;
        try {
            IMqttToken subToken = client.subscribe(topic, qos);
            subToken.setActionCallback(new IMqttActionListener() {
                @Override
                public void onSuccess(IMqttToken asyncActionToken) {
                    Log.d("MQTT-Subscribe", topic);
                }

                @Override
                public void onFailure(IMqttToken asyncActionToken,
                                      Throwable exception) {
                    Log.d("MQTT-Fail", topic);
                }
            });
        } catch (MqttException e) {
            e.printStackTrace();
        }
    }

    public void setListener(MainListener mainListener) {
        this.mainListener = mainListener;
    }

    public void setListener(AuthListener authListener) {
        this.authListener = authListener;
    }
}
