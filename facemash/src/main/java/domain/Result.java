package domain;

import com.google.gson.annotations.SerializedName;
import org.codehaus.jackson.annotate.JsonProperty;
import org.codehaus.jackson.annotate.JsonSetter;

public class Result {

    @SerializedName("user_id")
    private int userId;

    @SerializedName("left_user")
    private int leftUser;

    @SerializedName("right_user")
    private int rightUser;

    @SerializedName("vote")
    private boolean vote;

    public int getLeftUser() {
        return leftUser;
    }

    @JsonSetter("left_user")
    public void setLeftUser(int leftUser) {
        this.leftUser = leftUser;
    }

    public int getRightUser() {
        return rightUser;
    }

    public void setRightUser(int rightUser) {
        this.rightUser = rightUser;
    }

    public boolean isVote() {
        return vote;
    }

    public void setVote(boolean vote) {
        this.vote = vote;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

}
