package dao;

import org.springframework.jdbc.core.JdbcTemplate;

import javax.annotation.ManagedBean;
import javax.annotation.PostConstruct;
import javax.inject.Inject;

@ManagedBean
public class VotesDaoImpl implements VotesDao {

    @Inject
    DataBaseConfig dataBase;

    private JdbcTemplate jdbcTemplate;

    public VotesDaoImpl() { }

    public VotesDaoImpl(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @PostConstruct
    public void initialization() {
        jdbcTemplate = new JdbcTemplate(dataBase.getDataSource());
    }

    @Override
    public void addVote(int userId, int leftUserId, int rightUserId, boolean vote) {
        String sql = "INSERT INTO votes (user_id, left_user, right_user, vote) VALUES (?, ?, ?, ?)";
        jdbcTemplate.update(sql, userId, leftUserId, rightUserId, vote);
    }

}
