package fr.perso.ps6_final.service;

import fr.perso.ps6_final.model.User;

public class AuthService {

    private User currentUser;

    public AuthService() {
    }

    public boolean isConnected() {
        return currentUser != null;
    }
}
