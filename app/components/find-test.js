"use client";
import { useState, useEffect } from "react";
import { useUserAuth } from "../../../_utils/auth-context";
import Link from "next/link";
import { getData } from "../../../_services/dbFunctions";
import Navbar from "../../../components/navbar";
import { useRouter } from "next/navigation";
