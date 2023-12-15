import React, { useEffect, useState } from "react"
import * as TaskManager from "expo-task-manager"
import * as Location from "expo-location"
import {useDispatch} from 'react-redux'
import {setUserLocation} from '../store/AuthReducer'

const LOCATION_TASK_NAME = "LOCATION_TASK_NAME"
let foregroundSubscription = null

let lat;
let lng;

const useLocation = () => {
  const dispatch = useDispatch()
  const [userPosition, setUserPosition] = useState(null)
  // Request permissions right after starting the app
  useEffect(() => {
    const requestPermissions = async () => {
      const foreground = await Location.requestForegroundPermissionsAsync()
      if (foreground.granted) await Location.requestBackgroundPermissionsAsync()
    }
    requestPermissions()
    startBackgroundUpdate()
  }, [])


  // Start location tracking in background
  const startBackgroundUpdate = async () => {
    // Don't track position if permission is not granted
    const { granted } = await Location.getBackgroundPermissionsAsync()
    if (!granted) {
      console.log("location tracking denied")
      return
    }

    // Make sure the task is defined otherwise do not start tracking
    const isTaskDefined = await TaskManager.isTaskDefined(LOCATION_TASK_NAME)
    if (!isTaskDefined) {
      console.log("Task is not defined")
      return
    }

    // Don't track if it is already running in background
    const hasStarted = await Location.hasStartedLocationUpdatesAsync(
      LOCATION_TASK_NAME
    )
    if (hasStarted) {
      console.log("Already started")
      return
    }

    await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
      // For better logs, we set the accuracy to the most sensitive option
      accuracy: Location.Accuracy.BestForNavigation,
      // Make sure to enable this notification if you want to consistently track in the background
      showsBackgroundLocationIndicator: true,
    timeInterval: 5000,
      foregroundService: {
        notificationTitle: "Location",
        notificationBody: "Location tracking in background",
        notificationColor: "#fff",
      },
    })
  }

  // Stop location tracking in background
  const stopBackgroundUpdate = async () => {
    const hasStarted = await Location.hasStartedLocationUpdatesAsync(
      LOCATION_TASK_NAME
    )
    if (hasStarted) {
      await Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME)
      console.log("Location tacking stopped")
    }
  }
  TaskManager.defineTask("LOCATION_TASK_NAME", async ({ data, error }) => {
    if (error) {
      console.error(error)
      return
    }
    
    if (data) {
      // Extract location coordinates from data
      const { locations } = data
      const location = locations[0]
      const {latitude, longitude} = location.coords
      
      if (location) {
        dispatch(setUserLocation({latitude, longitude}))
        setUserPosition({latitude, longitude})
      }
      
    }
  })
  

  return userPosition
}




export default useLocation
