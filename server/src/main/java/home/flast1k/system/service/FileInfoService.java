package home.flast1k.system.service;

import home.flast1k.system.model.FileInfo;

import java.util.List;

public interface FileInfoService {

    void save(FileInfo user);

    List<FileInfo> findAll();
}
