import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";


 
export function HorizontalCard({name,description,mail,id,img}) {
  const defaultimg = "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80";
  return (
    <Card className="w-full max-w-[48rem] flex-row m-5">
      <CardHeader
        shadow={false}
        floated={false}
        className="w-2/5 m-0 rounded-r-none shrink-0"
      >
        <img
          src={img ? img : defaultimg}
          alt="card-image"
          className="object-cover w-full h-full"
        />
      </CardHeader>
      <CardBody>
        <Typography variant="h4" color="blue-gray" className="mb-2">
          {name}
        </Typography>
        <Typography color="gray" className="mb-8 font-normal">
          {description}
        </Typography>
        <Typography variant="h6" color="blue-gray" className="mb-2">
          {mail}
        </Typography>
        <Link to={`/${id}`} className="inline-block">
          <Button variant="text" className="flex items-center gap-2">
            See More
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
              />
            </svg>
          </Button>
        </Link>
      </CardBody>
    </Card>
  );
}