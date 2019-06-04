package fr.perso.ps6_final.activity;

import android.graphics.Color;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.widget.Button;
import android.widget.TextView;

import fr.perso.ps6_final.R;
import fr.perso.ps6_final.listener.RequestListener;
import fr.perso.ps6_final.model.Student;
import fr.perso.ps6_final.service.StudentService;

public class MainActivity extends AppCompatActivity implements RequestListener {

    private final StudentService STUDENT_SERVICE = new StudentService(this, this);

    private TextView nextStudentText;
    private Button nextStudentButton;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        nextStudentText = findViewById(R.id.main_next_student_text);

        nextStudentButton = findViewById(R.id.main_next_student_button);
        nextStudentButton.setOnClickListener(v -> {
            STUDENT_SERVICE.getNextStudent();
        });
    }

    @Override
    public void onRequestSuccess(Student response) {
        nextStudentText.setText(response.getFirstName());
    }

    @Override
    public void onRequestFailure(String error) {
        nextStudentText.setText(error);
    }
}