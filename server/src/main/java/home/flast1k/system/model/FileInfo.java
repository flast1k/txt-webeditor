package home.flast1k.system.model;


import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.nio.charset.Charset;
import java.util.Arrays;

@Entity
public class FileInfo {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;
    @Transient
    private String content;
    @JsonIgnore
    @Column(name = "binary_source")
    private byte[] binarySource;
    private String charset;

    public FileInfo() {
    }

    public FileInfo(String name, String content, String charset) {
        this.name = name;
        this.content = content;
        this.charset = charset;
        this.updateBinarySource();
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getContent() {
        if (content == null) {
            content = new String(binarySource, Charset.forName(charset));
        }
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public byte[] getBinarySource() {
        return binarySource;
    }

    public void setBinarySource(byte[] binarySource) {
        this.binarySource = binarySource;
    }

    public String getCharset() {
        return charset;
    }

    public void setCharset(String charset) {
        this.charset = charset;
    }

    public void updateBinarySource() {
        this.binarySource = this.content.getBytes(Charset.forName(charset));
    }

    @Override
    public String toString() {
        return "FileInfo{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", content='" + content + '\'' +
                ", binarySource=" + Arrays.toString(binarySource) +
                ", charset='" + charset + '\'' +
                '}';
    }
}
