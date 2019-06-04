package fr.perso.ps6_final.activity;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.widget.Button;
import android.widget.EditText;

import fr.perso.ps6_final.R;
import fr.perso.ps6_final.service.AuthService;


public class AuthActivity extends Activity {

    private final AuthService AUTH_SERVICE = new AuthService();

    private EditText email;
    private EditText password;
    private Button connectionButton;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_auth);

        this.email = findViewById(R.id.auth_email);
        this.password = findViewById(R.id.auth_password);
        this.connectionButton = findViewById(R.id.auth_connection_button);

        connectionButton.setOnClickListener((v) -> {
            String cEmail = email.getText().toString();
            String cPassword = password.getText().toString();
            if (AUTH_SERVICE.connect(cEmail, cPassword)) {
                Intent intent = new Intent(this, MainActivity.class);
                startActivity(intent);
            }
        });
    }
}
