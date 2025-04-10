import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import colorData from '../data/color.json';

const { width } = Dimensions.get('window');
const CELL_SIZE = 30;

const ColorCalendar = ({ onSelectDay }) => {
  const { t } = useTranslation();
  const { theme, themeMode } = useTheme();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [weeks, setWeeks] = useState([]);
  const translateX = useSharedValue(0);
  const direction = useRef(0);

  // Color mapping - แผนที่สี
  const colorMap = {
    Red: "#FF0000",
    Orange: "#FFA500",
    Gray: "#808080",
    Green: "#008000",
    "Light Blue": "#00BFFF",
    Blue: "#0000FF",
    Yellow: "#FFFF00",
    White: "#FFFFFF",
    Purple: "#800080",
    Black: "#000000",
    Gold: "#FFD700",
    Pink: "#FFC0CB",
    Cream: "#FFF5E1",
    Brown: "#8B4513",
  };

  // Generate calendar data whenever current month changes
  useEffect(() => {
    const weeksData = generateWeeksForMonth(currentMonth);
    setWeeks(weeksData);
  }, [currentMonth]);

  // Animation style for month transition
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  // Function to go to previous month with animation
  const goToPreviousMonth = () => {
    // Start animation (slide right)
    direction.current = 1;
    translateX.value = 0;
    translateX.value = withTiming(width * 0.5, { duration: 250 });

    // After a short delay, change the month and reset animation
    setTimeout(() => {
      const prevMonth = new Date(currentMonth);
      prevMonth.setMonth(prevMonth.getMonth() - 1);
      setCurrentMonth(prevMonth);
      
      // Reset animation immediately
      translateX.value = -width * 0.5;
      
      // Then animate back to center
      translateX.value = withTiming(0, { duration: 250 });
    }, 250);
  };

  // Function to go to next month with animation
  const goToNextMonth = () => {
    // Start animation (slide left)
    direction.current = -1;
    translateX.value = 0;
    translateX.value = withTiming(-width * 0.5, { duration: 250 });

    // After a short delay, change the month and reset animation
    setTimeout(() => {
      const nextMonth = new Date(currentMonth);
      nextMonth.setMonth(nextMonth.getMonth() + 1);
      setCurrentMonth(nextMonth);
      
      // Reset animation immediately
      translateX.value = width * 0.5;
      
      // Then animate back to center
      translateX.value = withTiming(0, { duration: 250 });
    }, 250);
  };
  
  // Go to today
  const goToToday = () => {
    const today = new Date();
    setSelectedDate(today);
    setCurrentMonth(today);
    
    // Notify parent component
    const dayName = today.toLocaleString('en-US', { weekday: 'long' });
    if (onSelectDay) {
      onSelectDay(dayName);
    }
  };

  // Generate calendar data structure
  const generateWeeksForMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    
    // First day of the month
    const firstDayOfMonth = new Date(year, month, 1);
    
    // Last day of the month
    const lastDayOfMonth = new Date(year, month + 1, 0);
    
    // First day of calendar (could be in previous month)
    const startDate = new Date(firstDayOfMonth);
    startDate.setDate(startDate.getDate() - startDate.getDay());
    
    // Array to hold all calendar weeks
    const weeksArray = [];
    let currentDate = new Date(startDate);
    
    // Generate 6 weeks to ensure we cover all month configurations
    for (let weekIndex = 0; weekIndex < 6; weekIndex++) {
      const week = [];
      
      // Generate 7 days for each week
      for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
        week.push({
          date: new Date(currentDate),
          isCurrentMonth: currentDate.getMonth() === month,
          isToday: isToday(currentDate),
          dayName: currentDate.toLocaleString('en-US', { weekday: 'long' }),
        });
        
        // Move to next day
        currentDate.setDate(currentDate.getDate() + 1);
      }
      
      weeksArray.push(week);
      
      // Check if we've gone past the end of the month
      if (currentDate > lastDayOfMonth && currentDate.getDay() === 0) {
        break;
      }
    }
    
    return weeksArray;
  };

  // Check if a date is today
  const isToday = (date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  // Check if a date is the selected date
  const isDateSelected = (date) => {
    return (
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()
    );
  };

  // Handle date selection
  const onDateSelect = (date) => {
    setSelectedDate(date);
    
    // Pass the selected day name to parent component
    const dayName = date.toLocaleString('en-US', { weekday: 'long' });
    if (onSelectDay) {
      onSelectDay(dayName);
    }
  };

  // Get lucky and unlucky colors for a specific day
  const getColorsForDay = (dayName) => {
    const dayData = colorData[dayName] || { lucky: [], unlucky: [] };
    return {
      lucky: dayData.lucky || [],
      unlucky: dayData.unlucky || []
    };
  };

  // Render lucky/unlucky color indicators
  const renderColorIndicators = (dayName) => {
    const dayColors = getColorsForDay(dayName);
    
    if (dayColors.lucky.length === 0 && dayColors.unlucky.length === 0) {
      return null;
    }

    return (
      <View style={styles.indicatorsContainer}>
        {dayColors.lucky.length > 0 && (
          <View style={[styles.colorIndicator, styles.luckyIndicator]} />
        )}
        {dayColors.unlucky.length > 0 && (
          <View style={[styles.colorIndicator, styles.unluckyIndicator]} />
        )}
      </View>
    );
  };

  return (
    <View style={[
      styles.calendarContainer, 
      { backgroundColor: theme.cardBackground }
    ]}>
      {/* Calendar header with month navigation */}
      <View style={styles.calendarHeader}>
        <TouchableOpacity onPress={goToPreviousMonth} style={styles.calendarNavButton}>
          <Ionicons name="chevron-back" size={22} color={theme.primaryColor} />
        </TouchableOpacity>
        
        <Animated.View style={[styles.monthYearContainer, animatedStyle]}>
          <Text style={[styles.monthYearText, { color: theme.textColor }]}>
            {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </Text>
        </Animated.View>
        
        <TouchableOpacity onPress={goToNextMonth} style={styles.calendarNavButton}>
          <Ionicons name="chevron-forward" size={22} color={theme.primaryColor} />
        </TouchableOpacity>
      </View>
      
      {/* Today button */}
      <TouchableOpacity 
        style={[
          styles.todayButton, 
          { backgroundColor: themeMode === 'dark' ? 'rgba(58, 42, 94, 0.8)' : 'rgba(240, 230, 255, 0.7)' }
        ]} 
        onPress={goToToday}
      >
        <Text style={[
          styles.todayButtonText, 
          { color: theme.primaryColor }
        ]}>{t('today')}</Text>
      </TouchableOpacity>
      
      {/* Day names header */}
      <View style={styles.weekdayHeader}>
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, i) => (
          <Text 
            key={i} 
            style={[
              styles.weekdayText, 
              { 
                color: i === 0 ? 
                  themeMode === 'dark' ? '#FF8A8A' : '#FF6B6B' : 
                  theme.textColor,
                opacity: 0.8  
              }
            ]}
          >
            {day}
          </Text>
        ))}
      </View>
      
      {/* Calendar grid */}
      <Animated.View style={[styles.calendarGrid, animatedStyle]}>
        {weeks.map((week, weekIndex) => (
          <View key={weekIndex} style={styles.calendarWeek}>
            {week.map((day, dayIndex) => {
              const dateIsToday = day.isToday;
              const dateIsSelected = isDateSelected(day.date);
              
              return (
                <TouchableOpacity
                  key={dayIndex}
                  style={[
                    styles.calendarDay,
                    !day.isCurrentMonth && styles.calendarDayDisabled,
                    dateIsToday && styles.calendarDayToday,
                    dateIsSelected && [
                      styles.calendarDaySelected,
                      { backgroundColor: themeMode === 'dark' ? 'rgba(58, 42, 94, 0.7)' : 'rgba(240, 230, 255, 0.7)' }
                    ]
                  ]}
                  onPress={() => {
                    if (day.isCurrentMonth) {
                      onDateSelect(day.date);
                    }
                  }}
                >
                  <Text
                    style={[
                      styles.calendarDayText,
                      { color: theme.textColor },
                      !day.isCurrentMonth && styles.calendarDayDisabledText,
                      dateIsToday && [styles.calendarDayTodayText, { color: theme.primaryColor }],
                      dateIsSelected && [styles.calendarDaySelectedText, { color: theme.primaryColor }]
                    ]}
                  >
                    {day.date.getDate()}
                  </Text>
                  
                  {dateIsSelected && (
                    <View style={[
                      styles.selectedIndicator, 
                      { backgroundColor: theme.primaryColor, opacity: 0.9 }
                    ]} />
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        ))}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  calendarContainer: {
    borderRadius: 20,
    padding: 14,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.03)',
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingHorizontal: 6,
  },
  calendarNavButton: {
    padding: 6,
    borderRadius: 16,
  },
  monthYearContainer: {
    alignItems: 'center',
    width: 150,
  },
  monthYearText: {
    fontSize: 17,
    fontFamily: 'Nunito-SemiBold',
    opacity: 0.9,
  },
  todayButton: {
    alignSelf: 'flex-end',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 12,
    marginRight: 8,
  },
  todayButtonText: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 12,
    opacity: 0.9,
  },
  weekdayHeader: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(240, 240, 240, 0.5)',
    paddingBottom: 8,
  },
  weekdayText: {
    fontSize: 13,
    fontFamily: 'Nunito-SemiBold',
    width: CELL_SIZE,
    textAlign: 'center',
  },
  calendarGrid: {
    paddingBottom: 5,
  },
  calendarWeek: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 12,
  },
  calendarDay: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
  },
  calendarDayText: {
    fontSize: 13,
    fontFamily: 'Nunito',
  },
  calendarDayToday: {
    borderWidth: 1,
    borderColor: 'rgba(100, 100, 200, 0.2)',
  },
  calendarDayTodayText: {
    fontFamily: 'Nunito-SemiBold',
  },
  calendarDaySelected: {
    elevation: 1,
  },
  calendarDaySelectedText: {
    fontFamily: 'Nunito-Bold',
  },
  calendarDayDisabled: {
    opacity: 0.4,
  },
  calendarDayDisabledText: {
    color: '#999999',
  },
  selectedIndicator: {
    width: 4,
    height: 4,
    borderRadius: 2,
    position: 'absolute',
    bottom: 3,
  },
  indicatorsContainer: {
    flexDirection: 'row',
    position: 'absolute',
    top: 2,
    right: 2,
  },
  colorIndicator: {
    width: 4,
    height: 4,
    borderRadius: 2,
    marginHorizontal: 1,
  },
  luckyIndicator: {
    backgroundColor: 'rgba(128, 255, 213, 0.7)',
  },
  unluckyIndicator: {
    backgroundColor: 'rgba(255, 184, 184, 0.7)',
  },
});

export default ColorCalendar; 