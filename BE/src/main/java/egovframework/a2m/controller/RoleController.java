package egovframework.a2m.controller;

import egovframework.a2m.dao.RoleDAO;
import egovframework.a2m.entities.Role;
import egovframework.a2m.model.response.DataResponse;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.support.DaoSupport;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.stringtemplate.v4.compiler.CodeGenerator.list_return;


@RestController
@RequestMapping("/api/v1/role")
public class RoleController {

    @Autowired
    RoleDAO roleDAO;
	
    @GetMapping
    public DataResponse<List<Role>> getAllRole(){
    	List<Role> list_return = roleDAO.getAllRole();
        return new DataResponse<List<Role>>(true, "Thành công", list_return);
    }
}
