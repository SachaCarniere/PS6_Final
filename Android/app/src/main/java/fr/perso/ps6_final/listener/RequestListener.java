package fr.perso.ps6_final.listener;

import fr.perso.ps6_final.model.Student;

public interface RequestListener {
    void onRequestSuccess(Student response);

    void onRequestFailure(String error);

    void onRequestSuccess(int number);

    void onRequestFailure2(String error);
}
