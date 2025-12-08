import Swal from "sweetalert2";
 const modals  = {
    success: (text) => Swal.fire("نتيجة", text, "success"),
    error: (text) => Swal.fire("نتيجة", text, "error"),
    deleteConfirm: () =>   Swal.fire({
          title: "تأكيد",
          text: "هل أنت متأكد من الحذف؟",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#d33 ",
          cancelButtonColor: "#3085d6",
          confirmButtonText: "نعم قم بمحيه",
          cancelButtonText: "تراجع",
        }),
}
export default modals;
