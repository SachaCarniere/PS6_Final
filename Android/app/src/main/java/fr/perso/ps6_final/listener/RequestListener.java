package fr.perso.ps6_final.listener;

public interface RequestListener {
    void onRequestSuccess(String response);
    void onRequestFailure(String error);
}
