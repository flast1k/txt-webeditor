package home.flast1k.system.controller;

import home.flast1k.system.exception.FileFormatException;
import home.flast1k.system.exception.FileNotFoundException;
import home.flast1k.system.model.FileInfo;
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
import java.nio.charset.StandardCharsets;
import java.util.Iterator;

@RestController
@RequestMapping(value = "/files")
public class FileController {

    private static final String APPLICATION_OCTET_STREAM = "application/octet-stream";
    private static final String TEXT_PLAIN = "text/plain";
    private FileInfo currentFileInfo;

    public FileController() {
        currentFileInfo = new FileInfo();
    }

    @PostMapping(value = "/upload")
    public @ResponseBody
    FileInfo upload(MultipartHttpServletRequest request) throws FileFormatException, FileNotFoundException, IOException {
        Iterator<String> itr = request.getFileNames();
        if (!itr.hasNext()) {
            throw new FileNotFoundException();
        }
        String content;
        MultipartFile mpf = request.getFile(itr.next());
        currentFileInfo.setName(mpf.getOriginalFilename());
        if (!TEXT_PLAIN.equals(mpf.getContentType())) {
            throw new FileFormatException();
        }
        content = new String(mpf.getBytes());
        currentFileInfo.setContent(content);
        return currentFileInfo;
    }

    @PostMapping(value = "/update")
    public @ResponseBody
    FileInfo update(@RequestBody FileInfo fileInfo) {
        currentFileInfo.setName(fileInfo.getName());
        currentFileInfo.setContent(fileInfo.getContent());
        return currentFileInfo;
    }

    @GetMapping("/download")
    public ResponseEntity<Resource> download() {
        InputStream stream = new ByteArrayInputStream(currentFileInfo.getContent().getBytes(StandardCharsets.UTF_8));
        Resource resource = new InputStreamResource(stream);

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(APPLICATION_OCTET_STREAM))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + currentFileInfo.getName() + "\"")
                .body(resource);
    }

}

