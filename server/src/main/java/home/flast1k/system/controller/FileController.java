package home.flast1k.system.controller;

import home.flast1k.system.exception.FileNotFoundException;
import home.flast1k.system.model.FileInfo;
import home.flast1k.system.service.FileInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.Charset;
import java.util.Iterator;
import java.util.List;

@RestController
@RequestMapping(value = "/files")
public class FileController {

    private static final String CHARSET = "charset";
    private static final String APPLICATION_OCTET_STREAM = "application/octet-stream";
    @Autowired
    private FileInfoService fileInfoService;

    @PostMapping(value = "/upload")
    public @ResponseBody
    FileInfo upload(MultipartHttpServletRequest request) throws FileNotFoundException, IOException {
        Iterator<String> itr = request.getFileNames();
        if (!itr.hasNext()) {
            throw new FileNotFoundException();
        }
        String charset = request.getParameter(CHARSET);
        MultipartFile mpf = request.getFile(itr.next());
        String originalFilename = mpf.getOriginalFilename();
        String content = new String(mpf.getBytes(), Charset.forName(charset));
        return fileInfoService.save(new FileInfo(originalFilename, content, charset));
    }

    @PostMapping(value = "/update")
    public @ResponseBody
    FileInfo update(@RequestBody FileInfo fileInfo) {
        fileInfo.updateBinarySource();
        fileInfoService.save(fileInfo);
        return fileInfo;
    }

    @GetMapping(value = "/getFileInfoHistory")
    public @ResponseBody
    List<FileInfo> getFileInfo() {
        return fileInfoService.findAll();
    }

    @GetMapping("/download/{id}")
    public ResponseEntity<Resource> download(@PathVariable("id") int id) {
        FileInfo fileInfo = fileInfoService.findById(id);
        return this.ConvertFileInfoToResourceEntity(fileInfo);
    }

    @PostMapping("/download")
    public ResponseEntity<Resource> download(@RequestBody FileInfo fileInfo) {
        fileInfo.updateBinarySource();
        return this.ConvertFileInfoToResourceEntity(fileInfo);
    }

    private ResponseEntity<Resource> ConvertFileInfoToResourceEntity(FileInfo fileInfo) {
        InputStream stream = new ByteArrayInputStream(fileInfo.getBinarySource());
        Resource resource = new InputStreamResource(stream);

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(APPLICATION_OCTET_STREAM))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + fileInfo.getName() + "\"")
                .body(resource);
    }

}

