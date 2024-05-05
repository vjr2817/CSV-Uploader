<?php


namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\Request;



class DataController extends AbstractController
{

    private const max_file_size =  5*1024*1024;

    public function postCSVFile(Request $request): JsonResponse
    {
        $res_data = ['status'=>'failure','message'=>'Invalid File Request'];
        $uploaded_file = $request->files->get('csvDocument');

        /**
         * Check File size and file is valid
         */
        if($uploaded_file && $uploaded_file->isValid()){
            if($uploaded_file->getSize() <= self::max_file_size){
                /**
                 * Check file type 
                 */
                $file_type =  $uploaded_file->getClientOriginalExtension();
                if($file_type === 'csv'){
                    $data_contents = $this->getCSVDataArray($uploaded_file);
                    $res_data = ['status'=>'success','data'=>$data_contents];
                    return new JsonResponse($res_data, Response::HTTP_OK);
                }
            }
            else{
                $res_data['message'] = 'File size should not exceed 5MB';
            }
        }
        return new JsonResponse($res_data, Response::HTTP_BAD_REQUEST);
     
    }

    /**
     * Converting CSV file to Array data
     */
    public function getCSVDataArray($uploaded_file){
        $file_contents = $uploaded_file->getContent();
        $lines = explode(PHP_EOL, $file_contents);
        $data_contents = array();
        foreach ($lines as $line) {
            $columns = explode(',',$line);
            $columns_array =  array();
            foreach($columns as $column){
                if($column){
                    $columns_array[] =$column;
                }
            }
            if(count($columns_array)>0)
                $data_contents[] = $columns_array;
        }
        return $data_contents;
    }

  
}