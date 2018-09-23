package home.flast1k.system.service;

import home.flast1k.system.model.User;

public interface UserService {
    User save(User user);
    User findByUsername(String username);
}
