package fr.perso.ps6_final.activity;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.widget.Button;
import android.widget.TextView;

import fr.perso.ps6_final.R;
import fr.perso.ps6_final.listener.RequestListener;
import fr.perso.ps6_final.model.Student;
import fr.perso.ps6_final.service.StudentService;

public class MainActivity extends AppCompatActivity implements RequestListener {

    private StudentService STUDENT_SERVICE;
    private TextView nextStudentText;
    private Button nextStudentButton;
    private TextView numberStudent;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        STUDENT_SERVICE = new StudentService(this, this);

        nextStudentText = findViewById(R.id.main_next_student_text);
        numberStudent = findViewById(R.id.main_number);

        nextStudentButton = findViewById(R.id.main_next_student_button);
        nextStudentButton.setOnClickListener(v -> {
            STUDENT_SERVICE.getNextStudent();
            STUDENT_SERVICE.getLeftStudents();
        });
    }

    @Override
    public void onRequestSuccess1(String s) {
        nextStudentText.setText(s);
    }

    @Override
    public void onRequestSuccess2(String number) {
        numberStudent.setText(number);
    }

    @Override
    public void onRequestFailure1(String error) {
        nextStudentText.setText(error);
    }

    @Override
    public void onRequestFailure2(String error) {
        numberStudent.setText(error);
    }
}