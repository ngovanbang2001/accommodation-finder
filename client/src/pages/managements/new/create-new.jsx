import ButtonPrimary from "@/components/button/ButtonPrimary";
import FormGroup from "@/components/common/FormGroup";
import { Input } from "@/components/input";
import UploadImages from "@/components/upload-media/UploadImages";
import { yupResolver } from "@hookform/resolvers/yup";
import { NewAPI } from "apis/new";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import dynamic from "next/dynamic";
import UploadImage from "@/components/upload-media/UploadImage";
import LayoutWithSideBar from "@/components/layout/LayoutWithSideBar";
import { toast } from "react-toastify";
import { NewCategoryAPI } from "apis/new-category";
import { Label } from "@/components/label";
import Select from "react-select";
import { useRouter } from "next/router";
import TextArea from "@/components/input/TextArea";
const MyEditor = dynamic(() => import("../../../components/my-editor/Editor"), {
  ssr: false,
});
const schema = yup.object({
  title: yup.string().required("Vui lòng nhập tiêu đề"),
  description: yup.string().required("Vui lòng nhập mô tả"),
});
const CreateNew = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });
  const [loading, setLoading] = useState(false);
  const [base64, setBase64] = useState(null);
  const [content, setContent] = useState("");
  const [categories, setCategories] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const router = useRouter();
  useEffect(() => {
    (async () => {
      try {
        const res = await NewCategoryAPI.getAllCategories({
          offset: 0,
          limit: 50,
        });
        if (res.categories) {
          const temp = res.categories.map((item) => ({
            value: item.id,
            label: item.name,
          }));
          setCategories([...temp]);
        }
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  const handleSelectCategory = (option) => {
    setSelectedCategory(option);
  };

  const createNew = async (values) => {
    try {
      setLoading(true);
      const res = await NewAPI.createNew({
        ...values,
        content,
        base64,
        categoryId: selectedCategory.value,
      });
      setLoading(false);
      if (res) {
        router.push("/managements/new");
        toast.success("Tạo bài viết thành công!", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else {
        toast.error("Đã có lỗi xảy ra!", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } catch (e) {
      console.log(e);
      setLoading(false);
      toast.error("Đã có lỗi xảy ra!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };
  return (
    <div className="mx-8 py-8">
      <h2>Biên tập nội dung tin tức</h2>
      <form onSubmit={handleSubmit(createNew)}>
        <FormGroup>
          <Label>Danh mục</Label>
          <Select
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                borderRadius: "8px",
                padding: "6px 0",
                borderColor: "#e5e7eb",
                margin: "8px 0",
              }),
            }}
            options={categories}
            onChange={(option) => {
              handleSelectCategory(option);
            }}
            isSearchable
            value={selectedCategory}
            placeholder={"Tin hay bất động sản"}
          />
        </FormGroup>
        <FormGroup>
          <Label className="font-bold">Ảnh bìa</Label>
          <UploadImage
            base64={base64}
            setBase64={setBase64}
            id={"new-thumbail"}
          />
        </FormGroup>
        <FormGroup>
          <Label className="font-bold">Tiêu đề</Label>
          <Input
            control={control}
            error={errors.title?.message}
            placeholder={"Tiêu đề bài viết"}
            name={"title"}
          />
        </FormGroup>
        <FormGroup>
          <FormGroup>
            <Label>Mô tả</Label>
            <TextArea
              control={control}
              name={"description"}
              error={errors.description?.message}
              placeholder={"Mô tả tin tức"}
            ></TextArea>
          </FormGroup>
        </FormGroup>
        <FormGroup>
          <Label className="font-bold">Nội dung</Label>
          <div className={""}>
            <MyEditor
              placeholder={"Nội dung tin tức...."}
              value={content}
              onBlurP={({ res }) => setContent(res)}
            />
          </div>
        </FormGroup>
        <div className="flex justify-end">
          <ButtonPrimary
            type="submit"
            title="Tạo tin"
            className="w-[200px] mt-2"
            isLoading={loading}
            disabled={loading}
          />
        </div>
      </form>
    </div>
  );
};
CreateNew.Layout = LayoutWithSideBar;
export default CreateNew;
