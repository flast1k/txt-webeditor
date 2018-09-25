package home.flast1k.system.repository;

import home.flast1k.system.model.FileInfo;
import home.flast1k.system.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FileInfoRepository extends JpaRepository<FileInfo, Long> {
    FileInfo findById(int id);
    List<FileInfo> findByAuthor(User user);
}
