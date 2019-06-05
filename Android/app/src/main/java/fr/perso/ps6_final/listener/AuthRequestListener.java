package fr.perso.ps6_final.listener;

import fr.perso.ps6_final.model.User;

public interface AuthRequestListener {
    void onRequestSuccess(User response);

    void onRequestFailure(String error);
}
