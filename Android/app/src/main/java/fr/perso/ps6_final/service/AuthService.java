package fr.perso.ps6_final.service;

import android.content.Context;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.Volley;
import com.google.gson.Gson;

import org.json.*;

import fr.perso.ps6_final.listener.AuthRequestListener;
import fr.perso.ps6_final.model.User;

public class AuthService {

    private String url = "http://10.212.99.67:1880/login";
    private Context context;
    private AuthRequestListener listener;

    public AuthService(Context context, AuthRequestListener listener) {
        this.context = context;
        this.listener = listener;
    }

    public boolean connect(String email, String passwrd) {

        JSONObject req = null;
        try {
            req = new JSONObject("{\"emailAddress\":" + email + ", \"password\":" + passwrd + "}");
        } catch (JSONException e) {
            e.printStackTrace();
        }

        RequestQueue queue = Volley.newRequestQueue(context);
        JsonObjectRequest request = new JsonObjectRequest(Request.Method.POST, url, req,
                response -> {
                    Gson gson = new Gson();
                    User newUser = gson.fromJson(response.toString(), User.class);
                    listener.onRequestSuccess(newUser);
                    User.setCurrentUser(newUser);
                },
                error -> listener.onRequestFailure("L'authentification a échoué.\nVérifiez que vous avez correctement rempli vos identifiants")
        );
        queue.add(request);
        return true;
    }
}
