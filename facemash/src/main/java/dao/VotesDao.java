package dao;

public interface VotesDao {

    void addVote(int userId, int leftUserId, int rightUserId, boolean vote);

}
