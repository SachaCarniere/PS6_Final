package fr.perso.ps6_final.activity;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

import com.google.gson.JsonObject;

import fr.perso.ps6_final.App;
import fr.perso.ps6_final.R;
import fr.perso.ps6_final.listener.AuthListener;
import fr.perso.ps6_final.model.User;
import fr.perso.ps6_final.service.MqttService;


public class AuthActivity extends Activity implements AuthListener {

    private EditText email;
    private EditText password;
    private Button connectionButton;
    private TextView error;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_auth);

        Intent intent = new Intent(this, MqttService.class);
        startService(intent);

        this.email = findViewById(R.id.auth_email);
        this.password = findViewById(R.id.auth_password);
        this.connectionButton = findViewById(R.id.auth_connection_button);
        this.error = findViewById(R.id.auth_error);

        connectionButton.setOnClickListener((v) -> {
            String cEmail = email.getText().toString();
            String cPassword = password.getText().toString();

            JsonObject payload = new JsonObject();
            payload.addProperty("emailAddress", cEmail);
            payload.addProperty("password", cPassword);

            ((App) getApplication()).setListener(this);
            ((App) getApplication()).publish("login", payload.toString());
        });
    }

    @Override
    public void onConnected(String response) {
        if (response.equals("true")) {
            Intent intent = new Intent(this, MainActivity.class);
            startActivity(intent);
        } else {
            this.error.setText("L'authentification a échoué.\nVérifiez que vous avez correctement rempli vos identifiants");
        }
    }
}
