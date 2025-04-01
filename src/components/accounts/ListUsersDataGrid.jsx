
import React from "react";
import background from "../../images/background.jpg";
import Navbar from "../common/Navbar";
import { Url } from "../../constants/global";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link,useNavigate } from "react-router-dom";
import { DataGrid, GridToolbar, GridToolbarContainer, GridToolbarColumnsButton, 
  GridToolbarFilterButton, GridToolbarDensitySelector, GridToolbarExport } from "@mui/x-data-grid";

  //import { useConfirm } from "material-ui-confirm";
  // import { GridApi, GridCellValue } from '@mui/x-data-grid';


var newUrl = Url + 'accounts/person';
var deleteUrl = Url + 'accounts/person/delete/';


const ListUsersDataGrid = () => {


    const [data, setData] = useState([]);
    const [userDataRows, setUserDataRows] = useState([]);

    ///   For navigate function
    const navigate = useNavigate();

    const confirm = useConfirm();

    let userDataColumns = [
      { field: 'slno', headerName: 'slno', width: 120 },
      { field: 'id', headerName: 'id', width: 170 },
      { field: 'name', headerName: 'name', width: 120 },
      { field: 'email', headerName: 'email', width: 170 },
      { field: 'mobile' ,headerName: 'mobile', width: 190 },
      { field: 'password', headerName: 'password', width: 120 , hide:true},
      {
        field: 'delete',
        headerName: 'Delete',
        sortable: false,
        renderCell: (params) => {

          ///////////  Delete button callback function

          const onClick = async (e) => {
            e.stopPropagation(); // don't select this row after clicking
    
            //alert("Paulsin");

            // const api: GridApi = params.api;
            // const thisRow: Record<string, GridCellValue> = {};
            const thisRow = {}; 
            //const thisRow: Record<string, GridCellValue> = {};
            // const api = params.api; 
            // const thisRow = {};
    
            api
              .getAllColumns()
              .filter((c) => c.field !== '__check__' && !!c)
              .forEach(
                (c) => (thisRow[c.field] = params.getValue(params.id, c.field)),
              );
            //alert(thisRow.id);
      
            //return alert(JSON.stringify(thisRow, null, 4));
 
            var deleteUrlTemp = deleteUrl + thisRow.id;

            handleDelete(deleteUrlTemp);
      
          };
    
          ////////////////  Delete button

          return <button
            className="btn btn-danger" 
            onClick={onClick}>Delete</button>;
        },
      },

    ];  

    const handleDelete = async (link) => {
      confirm({ description: "This action is permanent!" })
        .then(() => {
          //alert(link);
          
            const response = axios.get(link);
            //setData(response.data);
            //alert("Deletion successful");
            window.location.reload();
            //DataGrid.refresh();

        })
        .catch(() => {
          /* ... */
        });
    };

    function createRows(rowDatas) {
      //alert(rowDatas.length);
      var index = 1;
      //let editButton = <button></button>;  
  
      rowDatas.map(rowData => {
        //alert(rowData.id);
        setUserDataRows( userDataRows => [
          ...userDataRows,
          {'id':rowData._id, 'slno':index++, 'name':rowData.name, 'email':rowData.email, 'mobile':rowData.mobile},
        ]);
  
      })
    }

    const fetchData = async () => {
      try {
        const response = await axios.get(newUrl);
        setData(response.data);
        createRows(response.data);
        //alert(response.data[50].email  );
      } catch (error) {
        if (!error.response) {
          // Network error occurred
          console.error('Network error:', error);
        } else {
          // The server responded with a status other than 200 range
          console.error('Error response:', error.response);
        }
      }
    };

    function CustomToolbar() {
      return (
        <GridToolbarContainer>
          <GridToolbarColumnsButton />
          <GridToolbarFilterButton />
          <GridToolbarDensitySelector />
          <GridToolbarExport />
        </GridToolbarContainer>
      );
    } 
  
    useEffect(() => {
      //console.log('i fire once');
      fetchData();
      //alert("Paulsin");
    }, []);

    

    return(

    <div>


      <Navbar />


      <div class="row p-2">
          <div class="col-2">
            
          </div>
          <div class="col-10">
            <div style={{ height: 700, width: '100%' }}>
              <DataGrid rows={userDataRows} columns={userDataColumns} pageSize={10} components={{ Toolbar: CustomToolbar }}/>
            </div>
          </div>

        </div>
        

    </div>



    )
};

export default ListUsersDataGrid;