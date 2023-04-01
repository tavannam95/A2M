package egovframework.a2m.dao;

import egovframework.a2m.entities.Role;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface RoleDAO {
	
    List<Role> getAllRole();
    
}
