package home.flast1k.system.service;

import home.flast1k.system.model.FileInfo;
import home.flast1k.system.model.User;
import home.flast1k.system.repository.FileInfoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FileInfoServiceImpl implements FileInfoService {

    @Autowired
    private FileInfoRepository fileInfoRepository;

    public FileInfo save(FileInfo user) {
        return fileInfoRepository.save(user);
    }

    public List<FileInfo> findAll() {
        return fileInfoRepository.findAll();
    }

    public FileInfo findById(int id) {
        return fileInfoRepository.findById(id);
    }

    public List<FileInfo> findByAuthor(User user) {
        return fileInfoRepository.findByAuthor(user);
    }

}
