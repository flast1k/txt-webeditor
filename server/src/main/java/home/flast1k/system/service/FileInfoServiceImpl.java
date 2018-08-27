package home.flast1k.system.service;

import home.flast1k.system.model.FileInfo;
import home.flast1k.system.repository.FileInfoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class FileInfoServiceImpl implements FileInfoService {

    @Autowired
    private FileInfoRepository fileInfoRepository;

    @Transactional
    public FileInfo save(FileInfo user) {
        return fileInfoRepository.save(user);
    }

    @Transactional(readOnly = true)
    public List<FileInfo> findAll() {
        return fileInfoRepository.findAll();
    }

    @Override
    public FileInfo findById(int id) {
        return fileInfoRepository.findById(id);
    }


}
