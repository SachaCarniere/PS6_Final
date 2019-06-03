package fr.perso.ps6_final.service;

import android.content.Context;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONException;

import fr.perso.ps6_final.listener.RequestListener;

public class StudentService {
    // TODO : CHANGE THAT WITH YOUR IP
    private String url = "http://10.212.117.20:9428/api/queues/next/1559552732535";

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
                    try {
                        listener.onRequestSuccess(response.getString("firstName"));
                    } catch (JSONException e) {
                        listener.onRequestFailure("Parsing Error");
                        e.printStackTrace();
                    }
                },
                error -> listener.onRequestFailure(error.toString())
        );
        queue.add(request);
    }
}
