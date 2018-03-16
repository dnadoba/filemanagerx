Dropzone.options.uploadMultiple = true;

jQuery(($) => {
  $('table').DataTable({
    dom: 'Bflrtip',
    buttons: [
      'copy', 'csv', 'excel', 'pdf', 'print'
    ],
    lengthMenu: [20, 50, 100]
  });
});