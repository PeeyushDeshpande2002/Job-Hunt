import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import {  useSelector } from "react-redux";

const CompaniesTable = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const { companies, searchCompanyByText } = useSelector((store) => store.company);
  const [filterCompany, setFilterCompany] = useState(companies);
  

  
  useEffect(()=>{
    const filteredCompany = companies?.length > 0 && (companies.filter((company)=>{
        if(!searchCompanyByText)return true;
        return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());

    }));
    setFilterCompany(filteredCompany);
  },[searchCompanyByText, companies])


  const handleClick =(company) =>{
      navigate(`/admin/companies/${company._id}`);
  }
  return (
    <TableContainer>
      <Table>
        <caption
          style={{ captionSide: "top", textAlign: "left", marginBottom: "8px" }}
        >
          A list of your recent registered companies
        </caption>
        <TableHead>
          <TableRow>
            <TableCell>Logo</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Date</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filterCompany?.map((company) => (
            <TableRow key={company._id}>
              <TableCell>
                <Avatar src={company.logo} />
              </TableCell>
              <TableCell>{company?.name}</TableCell>
              <TableCell>{company?.createdAt?.split("T")[0]}</TableCell>
              <TableCell align="right">
                <IconButton onClick={()=>handleClick(company)}>
                <EditIcon fontSize="small" />
                <Typography variant="body2" sx={{ marginLeft: 1 }}>
                      Edit
                    </Typography>
                </IconButton>
                    
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CompaniesTable;
