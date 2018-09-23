package service;

import domain.Result;
import domain.User;

public interface MainServiceDao {

    User getUser(int userId);

    void updateVote(Result result);

}
