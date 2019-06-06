package fr.perso.ps6_final.listener;

import fr.perso.ps6_final.model.Student;

public interface RequestListener {
    void onRequestSuccess1(String string);

    void onRequestFailure1(String error);

    void onRequestSuccess2(String string);

    void onRequestFailure2(String error);
}
