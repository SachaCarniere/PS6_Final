package fr.perso.ps6_final.service;

import android.content.Context;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONException;
import org.json.JSONObject;

import fr.perso.ps6_final.listener.RequestListener;

public class StudentService {
    private String url = "https://raw.githubusercontent.com/ianbar20/JSON-Volley-Tutorial/master/Example-JSON-Files/Example-Object.JSON";

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
                        JSONObject obj = response.getJSONObject("colorObject");
                        listener.onRequestSuccess(obj.getString("colorName"));
                    } catch (JSONException e) {
                        listener.onRequestFailure("Parsing Error");
                        e.printStackTrace();
                    }
                },
                error -> listener.onRequestFailure("Request Error")
        );
        queue.add(request);
    }
}
