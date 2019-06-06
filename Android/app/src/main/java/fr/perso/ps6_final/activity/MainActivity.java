package fr.perso.ps6_final.activity;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.widget.Button;
import android.widget.TextView;

import fr.perso.ps6_final.App;
import fr.perso.ps6_final.R;
import fr.perso.ps6_final.listener.MainListener;

public class MainActivity extends AppCompatActivity implements MainListener {

    private TextView nextStudentText;
    private Button nextStudentButton;
    private TextView numberStudent;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        nextStudentText = findViewById(R.id.main_next_student_text);
        numberStudent = findViewById(R.id.main_number);
        nextStudentButton = findViewById(R.id.main_next_student_button);

        nextStudentButton.setOnClickListener(v -> {
            ((App) getApplication()).setListener(this);
            ((App) getApplication()).publish("button", "android");
        });
    }

    @Override
    public void stringIn1(String string) {
        nextStudentText.setText(string);
    }

    @Override
    public void stringIn2(String string) {
        numberStudent.setText(string);
    }
}