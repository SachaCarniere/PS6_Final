package fr.perso.ps6_final.activity;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

import fr.perso.ps6_final.R;
import fr.perso.ps6_final.listener.AuthRequestListener;
import fr.perso.ps6_final.model.User;
import fr.perso.ps6_final.service.AuthService;


public class AuthActivity extends Activity implements AuthRequestListener {

    private final AuthService AUTH_SERVICE = new AuthService(this, this);

    private EditText email;
    private EditText password;
    private Button connectionButton;
    private TextView error;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_auth);

        this.email = findViewById(R.id.auth_email);
        this.password = findViewById(R.id.auth_password);
        this.connectionButton = findViewById(R.id.auth_connection_button);
        this.error = findViewById(R.id.auth_error);

        connectionButton.setOnClickListener((v) -> {
            String cEmail = email.getText().toString();
            String cPassword = password.getText().toString();
            AUTH_SERVICE.connect(cEmail, cPassword);
        });
    }

    @Override
    public void onRequestSuccess(User response) {
        this.error.setText("");
        Intent intent = new Intent(this, MainActivity.class);
        startActivity(intent);
    }

    @Override
    public void onRequestFailure(String error) {
        this.error.setText(error);
    }
}
