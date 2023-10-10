import {
  Box,
  Button,
  Container,
  Divider,
  HStack,
  Heading,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import moment from "moment";
import "moment/locale/ar";
// import "moment/locale/en";
import { useTranslation } from "react-i18next";
moment.locale("ar");

interface dataWeather {
  temp: number | null;
  desc: string;
  maxTemp: number | null;
  minTemp: number | null;
  icon: string;
}
function PageMain() {
  const { t, i18n } = useTranslation();

  const [locale, setLocale] = useState("ar");
  const [timeAndDate, setTimeAndDate] = useState("");
  const [temp, setTemp] = useState<dataWeather>({
    temp: null,
    desc: "",
    maxTemp: null,
    minTemp: null,
    icon: "",
  });

  const handleLanguage = () => {
    if (locale === "en") {
      setLocale("ar");
      i18n.changeLanguage("ar");
      moment.locale("ar");
    } else if (locale === "ar") {
      setLocale("en");
      i18n.changeLanguage("en");
      moment.locale("en");
    }
    setTimeAndDate(moment().format("MMMM Do YYYY, h:mm:ss a"));
  };

  useEffect(() => {
    i18n.changeLanguage(locale);
  }, [i18n, locale]);

  useEffect(() => {
    axios
      .get(
        "https://api.openweathermap.org/data/2.5/weather?lat=24.77&lon=46.73&appid=f93d9dacbb6345308f5b5b7705477d29"
      )
      .then((res) => {
        console.log(res.data);
        const tempWeather = Math.round(+res.data.main.temp - 272.15);
        const maxTemp = Math.round(+res.data.main.temp_max - 272.15);
        const minTemp = Math.round(+res.data.main.temp_min - 272.15);
        setTemp({
          temp: tempWeather,
          desc: res.data.weather[0].description,
          maxTemp,
          minTemp,
          icon: res.data.weather[0].icon,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    setTimeAndDate(moment().format("MMMM Do YYYY, h:mm:ss a"));
  }, [timeAndDate]);
  return (
    <Box
      h={"100vh"}
      display={"flex"}
      alignItems={"center"}
      flexDir={"column"}
      justifyContent={"center"}
    >
      <Box
        dir={locale === "en" ? "ltr" : "rtl"}
        color={"white"}
        bg={"rgb(28 52 91/36%)"}
        w={"400px"}
        p={"5px"}
        //   mt={"10%"}
        borderRadius={"2xl"}
        boxShadow={"0px 20px 7px 0px rgba(0,0,0,0.5)"}
      >
        <HStack
          // dir="rtl"
          // justifyContent={"right"}
          alignItems={"end"}
          spacing={"5%"}
          // m={"1"}
        >
          <Heading fontWeight={"bold"} fontSize={"5xl"}>
            {t("Riyadh")}
          </Heading>

          <Text fontSize={"1xl"}>{timeAndDate}</Text>
        </HStack>
        <Divider />
        <HStack
          justifyContent={"space-between"}
          alignItems={"start"}
          h={"100%"}
        >
          <Box>
            <i
              className="glyphicon glyphicon-cloud"
              style={{ fontSize: "200px" }}
            ></i>
          </Box>
          <VStack spacing={"15px"}>
            <HStack dir="rtl" spacing={0}>
              <Text fontSize={"5xl"}>{temp.temp}</Text>
              <Image
                src={`https://openweathermap.org/img/wn/${temp.icon}@2x.png`}
              />
            </HStack>
            <Text fontSize={"4xl"}>{t(temp.desc)}</Text>
            <HStack h={"20px"} alignItems={"center"}>
              <Text fontSize={{ base: "small", md: "medium", lg: "2xl" }}>
                {t("min")}: {temp.minTemp}
              </Text>
              <Divider
                orientation="vertical"
                borderColor={"white"}
                borderStyle={"solid"}
              />
              <Text fontSize={{ base: "small", md: "medium", lg: "2xl" }}>
                {t("max")}: {temp.maxTemp}
              </Text>
            </HStack>
          </VStack>
        </HStack>
      </Box>
      <Container w={"370px"}>
        <Button
          mt={"25px"}
          textAlign={"left"}
          dir="left"
          fontSize={"2xl"}
          p={"15px"}
          onClick={handleLanguage}
        >
          {locale === "ar" ? "أنجليزي" : "ARABIC"}
        </Button>
      </Container>
    </Box>
  );
}

export default PageMain;
