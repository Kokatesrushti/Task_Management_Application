import React from "react";
import Image from "next/image";
import del from "../public/del.png";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

const Remove = ({ id }) => {
  const showDelete = (t, i) => {
    Swal.fire({
      title: t,
      icon: i,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const handleClick = async () => {
    try {
      const res = await fetch(`api/tasks?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        Swal.fire({
          title: "Task Deleted successfully",
          icon: "success",
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        });
      } else {
        showDelete("Failed to Delete", "error");
      }
    } catch (error) {
      console.log("Error while deleting task", error);
    }
  };

  return (
    <Image
      onClick={() => handleClick()}
      src={del}
      height={53}
      width={53}
      className="md:p-2 cursor-pointer mobile-image"
      alt="remove"
    />
  );
};

export default Remove;
