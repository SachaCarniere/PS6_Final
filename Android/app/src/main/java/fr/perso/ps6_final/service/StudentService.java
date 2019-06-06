package fr.perso.ps6_final.service;

import android.content.Context;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;
import com.google.gson.Gson;

import org.eclipse.paho.android.service.MqttAndroidClient;
import org.eclipse.paho.client.mqttv3.IMqttActionListener;
import org.eclipse.paho.client.mqttv3.IMqttMessageListener;
import org.eclipse.paho.client.mqttv3.IMqttToken;
import org.eclipse.paho.client.mqttv3.MqttClient;
import org.eclipse.paho.client.mqttv3.MqttException;
import org.eclipse.paho.client.mqttv3.MqttMessage;

import fr.perso.ps6_final.listener.RequestListener;
import fr.perso.ps6_final.model.Student;

public class StudentService {
    // TODO : CHANGE THAT WITH YOUR IP
    private String url = "http://10.212.99.67:1880/next";
    private String url2 = "http://10.212.99.67:1880/studentleft";
    private Context context;
    private RequestListener listener;
    private String clientId = MqttClient.generateClientId();
    private MqttAndroidClient client;

    public StudentService(Context context, RequestListener listener){
        this.context = context;
        this.listener = listener;
        client = new MqttAndroidClient(context, "tcp://localhost:1883", "Android");
        try {
            client.connect().setActionCallback(new IMqttActionListener() {
                @Override
                public void onSuccess(IMqttToken asyncActionToken) {
                }
                @Override
                public void onFailure(IMqttToken asyncActionToken, Throwable exception) {

                }
            });
        }
        catch (MqttException e){
            listener.onRequestFailure1("fuck to");
        }
    }

    public void getNextStudent() {
        try {
            MqttMessage message = new MqttMessage("pressed".getBytes());
            client.publish("button", message);
        }
        catch (MqttException e){
            System.out.println("Doopsie");
        }
        try {
            IMqttMessageListener iMqttMessageListener = (topic, message) -> listener.onRequestSuccess1(message.toString());
            IMqttToken subToken = client.subscribe("stringIn1", 0, iMqttMessageListener);
        }catch (MqttException e){
            System.out.println("Doopsi2");
        }
        try {
            IMqttMessageListener iMqttMessageListener = (topic, message) -> listener.onRequestSuccess2(message.toString());
            IMqttToken subToken = client.subscribe("stringIn2", 0, iMqttMessageListener);
        }catch (MqttException e){
            System.out.println("Doopsi3");
        }


        /*RequestQueue queue = Volley.newRequestQueue(context);
        JsonObjectRequest request = new JsonObjectRequest(Request.Method.GET, url, null,
                response -> {
                    Gson gson = new Gson();
                    listener.onRequestSuccess(gson.fromJson(response.toString(), Student.class));
                },
                error -> listener.onRequestFailure("Il n'y a plus d'étudiants")
        );
        queue.add(request);*/
    }

    public void getLeftStudents() {

       /* RequestQueue queue = Volley.newRequestQueue(context);
        StringRequest request =  new StringRequest(Request.Method.GET,url2,
                response -> {
             listener.onRequestSuccess(response);
        },
            error -> listener.onRequestFailure2("Oopsi doopsie")
        );
        queue.add(request);*/
    }


}
