package fr.perso.ps6_final;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.widget.Button;
import android.widget.TextView;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONException;
import org.json.JSONObject;

public class MainActivity extends AppCompatActivity {

    private TextView nextStudentText;
    private Button nextStudentButton;

    private String JsonURL = "https://raw.githubusercontent.com/ianbar20/JSON-Volley-Tutorial/master/Example-JSON-Files/Example-Object.JSON";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        nextStudentButton = findViewById(R.id.main_next_student_button);

        nextStudentButton.setOnClickListener(v -> {
            RequestQueue queue = Volley.newRequestQueue(this);
            JsonObjectRequest request = new JsonObjectRequest(Request.Method.GET, JsonURL, null,
                    response -> {
                        try {
                            JSONObject obj = response.getJSONObject("colorObject");
                            nextStudentText.setText(obj.getString("colorName"));
                        } catch (JSONException e) {
                            nextStudentText.setText("Parsing error");
                            e.printStackTrace();
                        }
                    },
                    error -> nextStudentText.setText("Request error")
            );

            queue.add(request);
        });

        nextStudentText = findViewById(R.id.main_next_student_text);
    }
}