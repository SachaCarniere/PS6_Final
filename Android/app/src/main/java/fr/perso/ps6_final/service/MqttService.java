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

/**
 * An {@link IntentService} subclass for handling asynchronous task requests in
 * a service on a separate handler thread.
 * <p>
 * TODO: Customize class - update intent actions, extra parameters and static
 * helper methods.
 */
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
                    subscribeStringIn1(client);
                    subscribeStringIn2(client);
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
                    if (topic.equals("stringIn1")) {
                        String response = new String(message.getPayload());
                        mainListener.stringIn1(response);
                    } else if (topic.equals("stringIn2")) {
                        String response = new String(message.getPayload());
                        mainListener.stringIn2(response);
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

    private void subscribeStringIn1(MqttAndroidClient client) {
        int qos = 0;
        try {
            IMqttToken subToken = client.subscribe("stringIn1", qos);
            subToken.setActionCallback(new IMqttActionListener() {
                @Override
                public void onSuccess(IMqttToken asyncActionToken) {
                    Log.d("MQTT-Subscribe", "stringIn1");
                }

                @Override
                public void onFailure(IMqttToken asyncActionToken,
                                      Throwable exception) {
                    Log.d("MQTT-Fail", "stringIn1");
                }
            });
        } catch (MqttException e) {
            e.printStackTrace();
        }
    }

    private void subscribeStringIn2(MqttAndroidClient client) {
        int qos = 0;
        try {
            IMqttToken subToken = client.subscribe("userLeft", qos);
            subToken.setActionCallback(new IMqttActionListener() {
                @Override
                public void onSuccess(IMqttToken asyncActionToken) {
                    Log.d("MQTT-Subscribe", "stringIn2");
                }

                @Override
                public void onFailure(IMqttToken asyncActionToken,
                                      Throwable exception) {
                    Log.d("MQTT-Fail", "stringIn2");
                }
            });
        } catch (MqttException e) {
            e.printStackTrace();
        }
    }

    public void setMainListener(MainListener mainListener) {
        this.mainListener = mainListener;
    }

    public void setAuthListener(AuthListener authListener) {
        this.authListener = authListener;
    }
}
