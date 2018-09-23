package domain;

import com.google.gson.annotations.SerializedName;

public class User {

    @SerializedName("user_id")
    private int userId;

    @SerializedName("elo_rating")
    private double eloRating;

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public double getEloRating() {
        return eloRating;
    }

    public void setEloRating(double eloRating) {
        this.eloRating = eloRating;
    }

}
