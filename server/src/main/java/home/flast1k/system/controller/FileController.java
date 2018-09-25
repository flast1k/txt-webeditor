package home.flast1k.system.controller;

import home.flast1k.system.exception.CharsetDetectionException;
import home.flast1k.system.exception.FileNotFoundException;
import home.flast1k.system.helper.AuditFactory;
import home.flast1k.system.helper.Utilities;
import home.flast1k.system.model.FileInfo;
import home.flast1k.system.model.User;
import home.flast1k.system.service.AuditService;
import home.flast1k.system.service.FileInfoService;
import home.flast1k.system.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.Charset;
import java.util.Iterator;
import java.util.List;

@RestController
@RequestMapping(value = "/files")
public class FileController {

    private static final String APPLICATION_OCTET_STREAM = "application/octet-stream";
    @Autowired
    private FileInfoService fileInfoService;
    @Autowired
    private AuditService auditService;
    @Autowired
    private UserService userService;

    @PostMapping(value = "/upload")
    public @ResponseBody FileInfo upload(MultipartHttpServletRequest request) throws FileNotFoundException, IOException, CharsetDetectionException {
        Iterator<String> itr = request.getFileNames();
        if (!itr.hasNext()) {
            AuditFactory.createAuditForExceptionAction("File not found in request");
            throw new FileNotFoundException();
        }
        User user = getCurrentUser(request);
        MultipartFile mpf = request.getFile(itr.next());
        Charset charset = Utilities.detectCharset(mpf.getInputStream());
        if (charset == null){
            AuditFactory.createAuditForExceptionAction("Charset not defined");
            throw new CharsetDetectionException();
        }
        String originalFilename = mpf.getOriginalFilename();
        String content = new String(mpf.getBytes(), charset);
        FileInfo fileInfo = fileInfoService.save(new FileInfo(originalFilename, content, charset.toString(), user));
        auditService.save(AuditFactory.createAuditForUploadAction(fileInfo));
        return fileInfo;
    }

    @PostMapping(value = "/update")
    public @ResponseBody FileInfo update(@RequestBody FileInfo fileInfo, HttpServletRequest request) {
        fileInfo.updateBinarySource();
        fileInfo.setAuthor(getCurrentUser(request));
        FileInfo updatedFileInfo = fileInfoService.save(fileInfo);
        auditService.save(AuditFactory.createAuditForUpdateAction(updatedFileInfo));
        return fileInfo;
    }

    @GetMapping(value = "/getFileInfoHistory")
    public @ResponseBody List<FileInfo> getFileInfo(HttpServletRequest request) {
        User user = getCurrentUser(request);
        return fileInfoService.findByAuthor(user);
    }

    @GetMapping("/download/{id}")
    public ResponseEntity<Resource> download(@PathVariable("id") int id) {
        FileInfo fileInfo = fileInfoService.findById(id);
        return this.ConvertFileInfoToResourceEntity(fileInfo);
    }

    @PostMapping("/download")
    public ResponseEntity<Resource> download(@RequestBody FileInfo fileInfo) {
        fileInfo.updateBinarySource();
        auditService.save(AuditFactory.createAuditForDownloadAction());
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

    private User getCurrentUser(HttpServletRequest request){
        String userName = request.getUserPrincipal().getName();
       return userService.findByUsername(userName);
    }

}

