package fr.perso.ps6_final.service;

import android.content.Context;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;
import com.google.gson.Gson;

import fr.perso.ps6_final.listener.RequestListener;
import fr.perso.ps6_final.model.Student;

public class StudentService {
    // TODO : CHANGE THAT WITH YOUR IP
    private String url = "http://10.212.99.67:1880/next";
    private String url2 = "http://10.212.99.67:1880/studentleft";
    private Context context;
    private RequestListener listener;

    public StudentService(Context context, RequestListener listener) {
        this.context = context;
        this.listener = listener;
    }

    public void getNextStudent() {
        RequestQueue queue = Volley.newRequestQueue(context);
        JsonObjectRequest request = new JsonObjectRequest(Request.Method.GET, url, null,
                response -> {
                    Gson gson = new Gson();
                    listener.onRequestSuccess(gson.fromJson(response.toString(), Student.class));
                },
                error -> listener.onRequestFailure("Il n'y a plus d'étudiants")
        );
        queue.add(request);
    }

    public void getLeftStudents() {

        RequestQueue queue = Volley.newRequestQueue(context);
        StringRequest request =  new StringRequest(Request.Method.GET,url2,
                response -> {
             listener.onRequestSuccess(response);
        },
            error -> listener.onRequestFailure2("Oopsi doopsie")
        );
        queue.add(request);
    }


}
