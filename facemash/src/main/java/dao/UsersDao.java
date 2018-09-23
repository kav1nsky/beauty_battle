package dao;

import domain.User;

public interface UsersDao {

    void insertUser(int userId);

    User getUser(int userId);

    void updateEloRate(int userId, double eloRate);

    void deleteUser(int userId);

}
