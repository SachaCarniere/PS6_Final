package fr.perso.ps6_final.model;

public class User {
    private static User currentUser;
    private long id;
    private String firstName;
    private String lastName;
    private String email;
    private String major;


    public User(int id, String firstName, String lastName, String email, String major) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.major = major;
    }

    public long getId() {
        return id;
    }

    public static User getCurrentUser() {
        return currentUser;
    }

    public static void setCurrentUser(User newUser) {
        currentUser = newUser;
    }

}
