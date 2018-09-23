package dao;

import domain.User;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;

import javax.annotation.ManagedBean;
import javax.annotation.PostConstruct;
import javax.inject.Inject;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@ManagedBean
public class UsersDaoImpl implements UsersDao {

    @Inject
    DataBaseConfig dataBase;

    private JdbcTemplate jdbcTemplate;

    public UsersDaoImpl() { }

    public UsersDaoImpl(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @PostConstruct
    public void initialization() {
        jdbcTemplate = new JdbcTemplate(dataBase.getDataSource());
    }

    @Override
    public void insertUser(int userId) {
        String sql = "INSERT INTO users (user_id) VALUES (?)";
        jdbcTemplate.update(sql, userId);
    }

    @Override
    public User getUser(int userId) {
        String sql = "SELECT * FROM users WHERE user_id=? LIMIT 1";
        List<User> users = jdbcTemplate.query(sql, rowMapperUser, userId);
        return users.isEmpty() ? null : users.get(0);
    }

    @Override
    public void updateEloRate(int userId, double eloRate) {
        String sql = "UPDATE users SET elo_rating=? WHERE user_id=?";
        jdbcTemplate.update(sql, eloRate,userId);
    }

    @Override
    public void deleteUser(int userId) {
        String sql = "DELETE FROM users WHERE user_id=?";
        jdbcTemplate.update(sql, userId);
    }

    private RowMapper<User> rowMapperUser = new RowMapper<User>() {
        @Override
        public User mapRow(ResultSet resultSet, int rowNum) throws SQLException {
            User user = new User();
            user.setUserId(resultSet.getInt("user_id"));
            user.setEloRating(resultSet.getDouble("elo_rating"));
            return user;
        }
    };

}
