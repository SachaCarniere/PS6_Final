package fr.perso.ps6_final;

import android.app.Application;

import org.eclipse.paho.android.service.MqttAndroidClient;

import fr.perso.ps6_final.listener.AuthListener;
import fr.perso.ps6_final.listener.MainListener;
import fr.perso.ps6_final.service.MqttService;

public class App extends Application {
    private MqttService mqttService;
    private MqttAndroidClient mqttClient;

    public void setMqttService(MqttService otherMqttService) {
        this.mqttService = otherMqttService;
    }

    public void setMqttClient(MqttAndroidClient client) {
        this.mqttClient = client;
    }

    public void publish(String topic, String payload) {
        this.mqttService.publish(this.mqttClient, topic, payload);
    }

    public void setListener(AuthListener listener) {
        this.mqttService.setListener(listener);
    }

    public void setListener(MainListener listener) {
        this.mqttService.setListener(listener);
    }
}
