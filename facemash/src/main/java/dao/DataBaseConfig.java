package dao;

import javax.sql.DataSource;

public interface DataBaseConfig {

    DataSource getDataSource();

}