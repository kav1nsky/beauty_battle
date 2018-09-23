package service;

import dao.UsersDao;
import dao.VotesDao;
import domain.Result;
import domain.User;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.ManagedBean;
import javax.inject.Inject;

@ManagedBean
public class MainServiceDaoImpl implements MainServiceDao {

    public static double DEFAULT_ELO_RATING = 1500;
    private static double DEFAULT_MAX_LOOSE = 16;

    @Inject
    private UsersDao usersDao;

    @Inject
    private VotesDao votesDao;

    @Transactional(readOnly = true)
    @Override
    public User getUser(int userId) {
        User user = usersDao.getUser(userId);
        if (user == null) {
            usersDao.insertUser(userId);
            user = new User();
            user.setUserId(userId);
            user.setEloRating(DEFAULT_ELO_RATING);
        }
        return user;
    }

    @Transactional(readOnly = false)
    @Override
    public void updateVote(Result result) {
        votesDao.addVote(result.getUserId(), result.getLeftUser(), result.getRightUser(),
                result.isVote());
        double left = getEloRating(result.getLeftUser());
        double right = getEloRating(result.getRightUser());
        usersDao.updateEloRate(result.getLeftUser(), left +
            getUpdatedEloRate(left, right, result.isVote()));
        usersDao.updateEloRate(result.getRightUser(), right +
            getUpdatedEloRate(right, left, !result.isVote()));
    }

    private double getEloRating(int userId) {
        User user = usersDao.getUser(userId);
        if (user == null) {
            usersDao.insertUser(userId);
            return DEFAULT_ELO_RATING;
        }
        return user.getEloRating();
    }

    private double calculateEloRate(double left, double right) {
        return 1.0 / (1.0 + Math.pow(10, (right - left) / 400));
    }

    private double getUpdatedEloRate(double left, double right, boolean vote) {
        double sa;
        if (vote) {
            sa = 0;
        } else {
            sa = 1;
        }
        return (sa - calculateEloRate(left, right)) * DEFAULT_MAX_LOOSE;
    }

}
