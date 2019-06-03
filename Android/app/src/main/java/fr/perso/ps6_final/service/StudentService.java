package fr.perso.ps6_final.service;

import android.content.Context;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.Volley;
import com.google.gson.Gson;

import fr.perso.ps6_final.listener.RequestListener;
import fr.perso.ps6_final.model.Student;

public class StudentService {
    // TODO : CHANGE THAT WITH YOUR IP
    private String url = "http://10.212.117.20:9428/api/users/1559551606329";

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
                error -> listener.onRequestFailure(error.toString())
        );
        queue.add(request);
    }
}
