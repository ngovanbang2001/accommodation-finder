import ButtonPrimary from "@/components/button/ButtonPrimary";
import FormGroup from "@/components/common/FormGroup";
import { Input } from "@/components/input";
import { yupResolver } from "@hookform/resolvers/yup";
import { NewAPI } from "apis/new";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import dynamic from "next/dynamic";
import UploadImage from "@/components/upload-media/UploadImage";
import { useRouter } from "next/router";
import { convertBase64FromUrl } from "utils/uploadImage";
import { toast } from "react-toastify";
import Select from "react-select";
import { Label } from "@/components/label";
import { NewCategoryAPI } from "apis/new-category";
import TextArea from "@/components/input/TextArea";

const MyEditor = dynamic(() => import("../../../components/my-editor/Editor"), {
  ssr: false,
});
const schema = yup.object({
  title: yup.string().required("Vui lòng nhập tiêu đề"),
  description: yup.string().required("Vui lòng nhập mô tả"),
});
const PostEdit = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const [base64, setBase64] = useState(null);
  const [content, setContent] = useState("");
  const [newData, setNewData] = useState(null);
  const [urlImage, setUrlImage] = useState(null);
  const [categories, setCategories] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const watcherTitle = watch("title");
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

  useEffect(() => {
    if (categories && newData) {
      const cate = categories?.find(
        (item) => item.value === newData.categoryId
      );
      if (cate) {
        setSelectedCategory(cate);
      }
    }
  }, [categories, newData]);

  const editNew = async (values) => {
    try {
      const data = {};
      if (newData.content !== content) {
        data.content = content;
      }
      if (newData.title !== watcherTitle) {
        data.title = watcherTitle;
      }
      if (newData.thumbnail !== urlImage) {
        data.base64 = base64;
      }
      if (newData.categoryId !== selectedCategory.value) {
        data.categoryId = selectedCategory.value;
      }
      const res = await NewAPI.updateNew({
        id: newData.id,
        data,
      });
      if (res.ok) {
        toast.success("Cập nhật bài viết thành công!", {
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

  useEffect(() => {
    (async () => {
      if (router.query.slug) {
        const id = router.query.slug.split("-").slice(-1);
        const res = await NewAPI.getNewById(id);
        if (res) {
          setNewData(res);
          setContent(res.content);
          const initialValue = {};
          initialValue.title = res.title;
          initialValue.description = res.description;
          reset({ ...initialValue });
          const base64Img = await convertBase64FromUrl(res.thumbnail);
          setUrlImage(res.thumbnail);
          setBase64(base64Img);
        }
      }
    })();
  }, [router]);

  const handleSelectCategory = (option) => {
    setSelectedCategory(option);
  };

  return (
    <div className="container mx-auto py-8">
      <form onSubmit={handleSubmit(editNew)}>
        <FormGroup>
          <Label>Danh mục</Label>
          {categories?.length > 0 && (
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
          )}
        </FormGroup>
        <FormGroup>
          <Label className={"font-bold"}>Ảnh bìa</Label>
          <UploadImage
            base64={base64}
            setBase64={setBase64}
            url={urlImage}
            id={"edit-thumbnail-new"}
            setUrlImage={setUrlImage}
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
          <div className={"container mx-auto"}>
            <MyEditor value={content} onBlurP={({ res }) => setContent(res)} />
          </div>
        </FormGroup>
        <div className="flex justify-end">
          <ButtonPrimary
            type="submit"
            title="Chỉnh sửa"
            className="w-[200px] mt-2"
          />
        </div>
      </form>
    </div>
  );
};

export default PostEdit;
