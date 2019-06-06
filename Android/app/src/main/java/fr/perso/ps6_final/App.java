package fr.perso.ps6_final;

import android.app.Application;

import org.eclipse.paho.android.service.MqttAndroidClient;

import fr.perso.ps6_final.service.MqttService;

public class App extends Application {
    private MqttService mqttService;
    private MqttAndroidClient mqttClient;

    public MqttService getMqttService() {
        return mqttService;
    }

    public void setMqttService(MqttService otherMqttService) {
        this.mqttService = otherMqttService;
    }

    public void setMqttClient(MqttAndroidClient client) {
        this.mqttClient = client;
    }

    public void publish(String topic, String payload) {
        this.mqttService.publish(this.mqttClient, topic, payload);
    }

    public MqttAndroidClient getMqttClient() {
        return mqttClient;
    }
}
